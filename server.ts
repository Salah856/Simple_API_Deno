import { Application} from 'https://deno.land/x/oak/mod.ts';
import router from './router.ts';

const app = new Application();
const port = 5000;

app.use(router.routes());
app.use(router.allowedMethods())

console.log('server is running : http://localhost:5000');

await app.listen({port});
