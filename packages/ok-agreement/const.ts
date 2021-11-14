export enum AGREEMENTS_TYPE {
    SA = 'service_agreement',
    PP = 'privacy_policy',
    IPRs = 'intellectual_property_clause'
}

export const AGREEMENTS = [
    {
        key: AGREEMENTS_TYPE.SA,
        name: '产品服务协议',
        url: 'https://fe-resource.baiteda.com/services-statement/v0.1/services.html',
    },
    {
        key: AGREEMENTS_TYPE.PP,
        name: '隐私条款',
        url: 'https://fe-resource.baiteda.com/services-statement/v0.1/privacy.html',
    },
    {
        key: AGREEMENTS_TYPE.IPRs,
        name: '知识产权条款',
        url: 'https://fe-resource.baiteda.com/services-statement/v0.1/IPRs.html',
    }
]

export function getAgreement(key: AGREEMENTS_TYPE) {
    return AGREEMENTS.find(item => {
        return item.key === key
    })
}