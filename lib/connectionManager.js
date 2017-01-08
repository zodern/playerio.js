import ByteBuffer from 'bytebuffer';
import { EventEmitter } from 'events';

let rooms = {};
let id = 0;
let socket = null;
let connecting = false;

function handleMessage(m) {
  switch (m.c) {
    case 'connected':
      rooms[m.id].emit('connect');
      break;
    case 'data':
      rooms[m.id]._message(m.data);
      break;
    case 'closed':
      rooms[m.id]._closed();
  }
}

function startConnection() {
  if (connecting) {
    return;
  }
  connecting = true;

  socket = new SockJS(`//${location.hostname}:${location.port}/_pio`);
  socket.onopen = function () {
    console.log('open');
    connecting = false;

    Object.keys(rooms).forEach((key) => {
      if (rooms[key] !== null && rooms[key]._isConnected === false) {
        socket.send(JSON.stringify({
          c: 'join',
          id: rooms[key].id,
          address: rooms[key].endpoint.address,
          port: rooms[key].endpoint.port
        }));
      }
    })
  }

  socket.onmessage = function (m) {
    handleMessage(JSON.parse(m.data));
  }

  socket.onclose = function () {
    console.log('close');

    Object.keys(rooms).forEach((key) => {
      if (rooms[key] !== null) {
        rooms[key]._closed();
        rooms[key] = null;
      }
    });
    socket = null;
    connecting = false;
  }
}

class RoomConnection extends EventEmitter {
  constructor(serializer, endpoint, _id) {
    super();

    this.serializer = serializer;
    this.endpoint = endpoint;
    this.id = _id;
    this._isConnected = false;
  }
  _connected() {

  }
  _message(data) {
    let result = new ByteBuffer(data.length);
    data.forEach((d) => {
      result.writeInt8(d);
    });
    this.emit('data', result);
  }
  _closed() {
    this.emit('close');
  }
  close() {
    // TODO: we should completely clean up. This shouldn't be needed.
    if (socket !== null) {
      socket.send(JSON.stringify({
        c: 'end',
        id: this.id
      }))
    }
  }
  write(m) {
    let dataArray = [];
    for (let i = 0; i < m.limit; i++) {
      dataArray.push(m.view[i]);
    }

    socket.send(JSON.stringify({
      c: 'write',
      id: this.id,
      data: dataArray
    }));
  }
}

export function addRoom(serializer, endpoint) {
  let _id = ++id;
  rooms[_id] = new RoomConnection(serializer, endpoint, _id);

  if (socket === null) {
    startConnection();
  } else if (connecting === false) {
    socket.send(JSON.stringify({
      c: 'join',
      id: rooms[_id].id,
      address: rooms[_id].endpoint.address,
      port: rooms[_id].endpoint.port
    }));
  }
  return rooms[_id];
}
