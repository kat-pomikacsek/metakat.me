const client = require('../../lib/contentful');

module.exports = async () => {
    return client.getEntries({ 
            content_type: 'caseStudy', 
            order: 'sys.createdAt',
            include: 10
        }).then(function (response) {
        const caseStudy = response.items
            .map(function (caseStudy) {
                caseStudy.fields.date = new Date(caseStudy.sys.updatedAt);
                return caseStudy.fields;
            });
        return caseStudy;
    })
        .catch(console.error);
};