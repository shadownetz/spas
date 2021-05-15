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

class Inbox{
    constructor(userId){
        this.userID = $('#usr-id');
        this.fetchInboxURL = $('#fetch-inbox-url')
    }

    async fetchInbox(){
        let response = {
            inbox: [],
        };
        try{
            response = await $.ajax({
                url: this.fetchInboxURL.val(),
                type: 'POST',
                data: {
                    userId: this.userID.val()
                },
                dataType: 'json',
            });
        }catch (e) {
            console.log('Error while fetching inbox:', e)
        }
        return Promise.resolve(response)
    }
}

const VueMethodMixins = {
    methods: {
        testEmailRegExp(email){
            return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
        },
        todaysDate(){
            let _date = new Date();
            return _date.toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        },
        getReadableDate(store_timestamp){
            if(store_timestamp){
                let _date = new Date(0);
                _date.setSeconds(store_timestamp.seconds);
                if(_date.getTime() === _date.getTime())
                    return _date.toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
            }
            return 'No Date'
        },
        getReadableTime(timestamp){
            let date = new Date(timestamp);
            if(date.getTime() === date.getTime())
                return date.toLocaleString(undefined, { hour: 'numeric', minute: 'numeric', hour12: true })
        },
        getReadableDatetime(store_timestamp){
            if(store_timestamp){
                let _date = new Date(0);
                _date.setSeconds(store_timestamp.seconds);
                if(_date.getTime() === _date.getTime())
                    return _date.toLocaleString(undefined, {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
            }
            return 'No DateTime'
        }
    }
};

function UserMessageUIModel(){
    this.is_staff = false;
    this.avatar = '';
    this.name = '';
    this.is_read = false;
    this.subject = '';
    this.content = '';
    this.has_attachments = false;
    this.timestamp = new Date();
    this.messageId = ''
}