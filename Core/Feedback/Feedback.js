const Salter = require('../Salter')

module.exports = class Feedback{

    constructor() {

    }

    static ShowFeedback(enumType, message, timeout = enumType.DEFAULT_TIMEOUT){
        let id = Salter.GenerateID()
        let fb =  `<script id="feedback-${id}"> let div${id} = document.createElement("div");
        div${id}.id = "${enumType.TYPE}";
        div${id}.classList.add("${enumType.COLOR}");
        document.getElementById("feedback-div").appendChild(div${id});

        let text${id} = document.createElement("p");
        text${id}.innerHTML = "${message}";
        div${id}.appendChild(text${id});
        
        setTimeout(function(){
            document.getElementById("feedback-div").removeChild(div${id});
            document.getElementById("feedback-${id}").remove();  
        }, ${timeout}*1000);
        </script>`
        return fb;

    }

};