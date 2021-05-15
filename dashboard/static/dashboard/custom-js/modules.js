class Attachment{

    constructor(files={}){
        this.uploadAttachmentURL = $('#upload-attach-url');
        this.deleteAttachmentURL = $('#delete-attach-url');
        this.files = Object.entries(files).map(file=>file[1])
    }

    async uploadAttachments(){
        const file_names = this.files.map(file=>file.name);
        let file_promises = this.files.map(file=>this.readFileAsB64(file));
        let b64_files = await Promise.all(file_promises);
        let saved_file_ids = b64_files.map((b64_file, index)=>this.uploadAttachment(b64_file, file_names[index]));
        saved_file_ids = await Promise.all(saved_file_ids);
        return Promise.resolve(saved_file_ids)
    }

    async readFileAsB64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e)=>{
                resolve(e.target.result)
            };
            reader.onerror = (e)=>{
                reject(e)
            };
            reader.readAsDataURL(file)
        })
    }

    async uploadAttachment(b64File, filename){
        let response = {};
        try{
            response = await $.ajax({
                url: this.uploadAttachmentURL.val(),
                type: 'POST',
                data: {
                    file: b64File,
                    name: filename
                },
                dataType: 'json',
            });
        }catch (e) {
            console.log('Error while uploading attachment:', e)
        }
        return Promise.resolve(response)
    }

    async deleteAttachment(fileId){
        let response = {};
        try{
            response = await $.ajax({
                url: this.deleteAttachmentURL.val(),
                type: 'POST',
                data: {id: fileId},
                dataType: 'json',
            });
        }catch (e) {
            console.log('Error while deleting attachment:', e)
        }
        return Promise.resolve(response)
    }

    static getAttachmentUI(filename, size, id){
        return `
        <div class="nk-file-item nk-file" id="file-item-${id}">
            <div class="nk-file-info">
                <div class="nk-file-title">
                    <div class="nk-file-icon"><span class="nk-file-icon-type"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><path d="M50,61H22a6,6,0,0,1-6-6V22l9-11H50a6,6,0,0,1,6,6V55A6,6,0,0,1,50,61Z" style="fill:#7e95c4"></path><path d="M25,20.556A1.444,1.444,0,0,1,23.556,22H16l9-11h0Z" style="fill:#b7ccea"></path><rect x="27" y="31" width="18" height="2" rx="1" ry="1" style="fill:#fff"></rect><rect x="27" y="35" width="18" height="2" rx="1" ry="1" style="fill:#fff"></rect><rect x="27" y="39" width="18" height="2" rx="1" ry="1" style="fill:#fff"></rect><rect x="27" y="43" width="14" height="2" rx="1" ry="1" style="fill:#fff"></rect><rect x="27" y="47" width="8" height="2" rx="1" ry="1" style="fill:#fff"></rect></svg></span></div>
                    <div class="nk-file-name">
                        <div class="nk-file-name-text">
                            <a href="javascript:void(0)" class="title">${filename}</a>
                        </div>
                    </div>
                </div>
                <ul class="nk-file-desc">
                    <li class="size">${size} MB</li>
                </ul>
            </div>
            <div class="nk-file-actions">
                <div class="dropdown">
                    <a href="javascript:void(0)" id="attach-del-${id}" class="btn btn-sm btn-icon btn-trigger attach-del">
                        <em class="icon ni ni-trash"></em>
                    </a>
                </div>
            </div>
    </div>
        `
    }
}