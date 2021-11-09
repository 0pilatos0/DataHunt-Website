export default class Modal{

    static Load(path){
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', path, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(xhr.responseText);
                    } else {
                        reject(xhr.statusText);
                    }
                }
            };
            xhr.send();
        });
    }

    static Confirm(title, body, confirm, requestLocation, requestData){
        let data = this.Load("/js/Modals/ModalTemplate.html")

        data.then((data) =>{
            data = data.replace("{{TITLE}}", title)
            data = data.replace("{{BODY}}", body)
            data = data.replace("{{CONFIRM}}", confirm)

            document.body.insertAdjacentHTML("beforeend", data);
            let modal = new bootstrap.Modal(document.getElementById('popupModal'));
            modal.show();

            document.getElementById("cancelModal").onclick = function () {
                document.getElementById("popupModal").remove()
            };

            document.getElementById("modalConfirm").onclick = function(){
                var xhr = new XMLHttpRequest();
                xhr.open("POST", requestLocation, true);

                //Send the proper header information along with the request
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                xhr.onreadystatechange = function() { // Call a function when the state changes.
                    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

                    }
                }
                xhr.send(requestData)

                // xhr.send(new Int8Array());
                // xhr.send(document);
            }
        });

    }


};