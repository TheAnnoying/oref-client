export function log(text, type = "log") {
    switch(type.toLowerCase()){
        case "log":
            console.log("%cINFO", `
                background: #4CAF50;
                color: #111;
                padding: 0 5px;
                border-radius: 10px
            `, text);
            break;
        case "warn":
            console.warn("%cWARN", `
                background: #af9a4c;
                color: #111;
                padding: 0 5px;
                border-radius: 10px;
            `, text);
            break;
        case "error":
            console.error("%cERROR", `
                background: #af4c4c;
                color: #111;
                padding: 0 5px;
                border-radius: 10px
            `, text);
            break;
    }
}