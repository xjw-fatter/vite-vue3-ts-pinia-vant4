import mitt from 'mitt';
type Events = {
    authReady?: DragEvent;
};
const Bus = mitt<Events>();
export default Bus;
