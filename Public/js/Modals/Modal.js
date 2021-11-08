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

    static Confirm(name, title, body, confirm, type, action, id, request){
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
                eval(request);
            }
        });

    }


};