// ==UserScript==
// @name         Aminos.ai Delete all
// @namespace    http://tampermonkey.net/
// @version      2024-03-19
// @description  try to take over the world!
// @author       Fredrik Norling 
// @match        https://app.aminos.ai/dashboard/*/responses
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aminos.ai
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function postData(formarr,pos) {
        var x=pos;

        var formData=formarr[x];

        const body = JSON.stringify({ _token: formData.token });

  const xhr = new XMLHttpRequest();
  xhr.open("POST", formData.action);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
          x++;
        if(x>=formarr.length){
            window.location.reload(true);
        }else{
            postData(formarr,x)
        }
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  }
  xhr.send(body);

}

    function doClick(){
         swal({
                title: "Are you sure?",
                text: "This will delete all responses. This action cannot be reversed!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {

                    if (willDelete) {
                      var formDataArray= getFormData();
                        var formData=[];
                        for(var x=0;x<formDataArray.length;x++){
                              if (formDataArray[x].action.indexOf('delete')!=-1) {
                                  formData.push(formDataArray[x])
                              }
                        }
                        if(formDataArray){
                            postData(formData,0);
                        }
                    }
                });
    }
    function getFormData() {
  const forms = document.getElementsByTagName('form');
  const formDataArray = Array.from(forms).map(form => {
    const action = form.getAttribute('action');
    const token = form.querySelector('input[name="_token"]').value;
    return {
      action: action,
      token: token
    };
  });
        return formDataArray;
}

console.log(getFormData());
const pageTitle = document.querySelector('.page-title');
const newATag = document.createElement('a');
newATag.href = '#';
newATag.textContent = 'Delete All';
newATag.onclick=doClick;
newATag.className="btn btn-danger";
pageTitle.insertBefore(newATag, pageTitle.lastChild.nextSibling);

})();
