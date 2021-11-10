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

    static Confirm(title, body, requestData, confirm, requestLocation){
        let data = this.Load("/js/Modals/ModalTemplate.html")

        data.then((data) =>{
            data = data.replace("{{TITLE}}", title)
            data = data.replace("{{LOCATION}}", requestLocation)
            data = data.replace("{{BODY}}", body)
            data = data.replace("{{CONFIRM}}", confirm)

            let post = "";

            Object.keys(requestData).forEach(key =>{
                post += `<input type="hidden" name="${key}" value="${requestData[key]}"></input>`;
            })

            data = data.replace("{{VALUES}}", post)

            document.body.insertAdjacentHTML("beforeend", data);
            let modal = new bootstrap.Modal(document.getElementById('popupModal'));
            modal.show();

            document.getElementById("cancelModal").onclick = function () {
                document.getElementById("popupModal").remove()
            };
            
        });

    }


};