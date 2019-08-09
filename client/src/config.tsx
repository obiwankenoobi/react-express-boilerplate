type Config = {
    __DEGUGGING__: boolean;
    backEndServer:string;
}


const config:Config = {
    __DEGUGGING__:true,
    backEndServer: 'https://express-react-boilerplate-back.herokuapp.com' // change this to  'http://localhost:3010' when cloning the project
}



export default config