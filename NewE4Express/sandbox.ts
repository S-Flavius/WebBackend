import { z } from "zod";

const schemaString = z.string();

try {
    schemaString.parse("Hallo");
} catch (error: any) {
    console.log(error.issues);
}


schemaString.min(1);

const objectSchema = z.object({
    name: z.string().min(1),
    email: z.string().trim().email()
});

let right1 = { "name": "Hallo Welt", "email": "hallo@welt.de" };
let right2 = { "name": "Hallo Welt", "email": "    hallo@welt.de  " };
let rong1 = { "name": "Hallo Welt", "email": "hallo.welt.de" };
let rong2 = { "name": "", "email": "hallo@welt.de" };
let rong3 = { "name": 5, "email": "hallo@welt.de" };

objectSchema.parse(right1);
objectSchema.parse(right2);
try { objectSchema.parse(rong1); } catch (e) { /*console.log(e);*/ }
try { objectSchema.parse(rong2); } catch (e) { /*console.log(e);*/ }
try { objectSchema.parse(rong3); } catch (e) { /*console.log(e);*/ }
