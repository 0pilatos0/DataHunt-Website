const { randomString } = require("../Utils");

module.exports = class Feedback{

    constructor() {

    }

    static ShowFeedback(enumType, message, timeout = enumType.DEFAULT_TIMEOUT){
        let id = randomString(16);
        let fb =  `<script id="feedback-${id}"> let div${id} = document.createElement("div");` +
        `div${id}.id = "${enumType.TYPE}";` +
        `div${id}.classList.add("${enumType.COLOR}");` +
        `document.getElementById("feedback-div").appendChild(div${id});` +

        `let text${id} = document.createElement("p");` +
        `text${id}.innerHTML = "${message}";` +
        `div${id}.appendChild(text${id});` +

        `let button${id} = document.createElement('button');
        button${id}.innerText = 'x';
        button${id}.onclick = () => {
            delete${id}();
        }
        button${id}.classList.add("${enumType.COLOR}");
        div${id}.appendChild(button${id});
        ` +
        
        `setTimeout(function(){
            delete${id}();
        }, ${timeout}*1000);
        function delete${id}(){
            document.getElementById("feedback-div").removeChild(div${id});
            document.getElementById("feedback-${id}").remove();  
        }
        </script>`
        return fb;
    }
};