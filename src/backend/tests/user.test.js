import "../server";
import {tokenExpired} from "../../App"

describe("Users",()=>{
    test("Get all users from database",async ()=>{
        let request = await fetch("http://localhost:8080/api/users");
        console.log(await request.json());
        expect(request.status).toEqual(200);
    })
    
    test("Find a specific user from database",async ()=>{
        let request = await fetch("http://localhost:8080/api/users/1");
        console.log(await request.json());
        expect(request.status).toEqual(200);
    })
    
    test("Check if user is a client or an employee",async ()=>{
        let request = await fetch("http://localhost:8080/api/users/1/client");
        console.log(await request.json());
        expect(request.status).not.toEqual(404);
    })
    test("Check if datas match any user",async ()=>{
        const body = {nom:"norris"};
        let request = await fetch("http://localhost:8080/api/users/user/login",{
            method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)
        });
        console.log(await request.json());
        expect(request.status).not.toEqual(404);
    })
    test("Assign a token to the logged in user",async ()=>{
        let request = await fetch("http://localhost:8080/api/users/3");
        const user = await request.json();
        request = await fetch("http://localhost:8080/api/users/",{
            method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(user)
        });
        const token = (await request.json()).token;
        console.log(tokenExpired(token));


        expect(await request.status).not.toEqual(404);
    })
})