import axios from 'axios';

export default class HtmlContentPostprocess {
    contentToHtmlRootNode = (htmlString) => {
        const div = document.createElement('div');
        div.innerHTML = htmlString ? htmlString.trim() : '';
        return div;
    };

    extractImgSources = (htmlRootNode) => {
        const outputList = [];
        const recurseDomChildren = (node) => {
            if(node.localName === 'img') {
                const srcLink = node.currentSrc;
                srcLink.startsWith('blob:') && outputList.push(srcLink);
            }
            node.childNodes.forEach((child) => {
                recurseDomChildren(child)
            })
        };

        recurseDomChildren(htmlRootNode);

        return outputList;
    };

    blobUrlToFile = async (blobUrl) => {
        let file;
        await axios({
            method: 'get',
            url: blobUrl,
            responseType: 'blob'
        }).then(response => {
            file = new File([response.data], 'temporaryImg.jpg', {
                type: "image/jpeg"
            });
        }).catch(error => {
            throw {
                message: 'error.retrievingBlob',
                error
            }
        });

        return file;
    };

    getUrlMap = async (blobUrls) => {
        const urlMap = {};
        for (let blobUrl of blobUrls) {
            urlMap[blobUrl] = await this.blobUrlToFile(blobUrl);
        }
        return urlMap;
    };

    getContentFiles = async(content) => {
        const htmlRootNode = this.contentToHtmlRootNode(content);
        const imgBlobUrls = this.extractImgSources(htmlRootNode);
        return await this.getUrlMap(imgBlobUrls);
    };
}