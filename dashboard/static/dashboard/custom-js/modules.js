class Attachment{

    constructor(files={}){
        this.uploadAttachmentURL = $('#upload-attach');
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
}