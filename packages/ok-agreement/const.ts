export enum AGREEMENTS_TYPE {
    SA = 'service_agreement',
    PP = 'privacy_policy',
    IPRs = 'intellectual_property_clause'
}

export const AGREEMENTS = [
    {
        key: AGREEMENTS_TYPE.SA,
        name: '用户协议',
        enName: '',
        url: 'https://fe-resource.baiteda.com/services-statement/v1.0/services.html',
        enUrl: ''
    },
    {
        key: AGREEMENTS_TYPE.PP,
        name: '隐私条款',
        enName: 'Privacy Policy',
        url: 'https://fe-resource.baiteda.com/services-statement/v1.0/privacy.html',
        enUrl: ''
    },
    {
        key: AGREEMENTS_TYPE.IPRs,
        name: '知识产权声明',
        enName: '',
        url: 'https://fe-resource.baiteda.com/services-statement/v1.0/IPRs.html',
        enUrl: ''
    }
]

export function getAgreement(key: AGREEMENTS_TYPE) {
    return AGREEMENTS.find(item => {
        return item.key === key
    })
}