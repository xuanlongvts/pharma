var currentDate = new Date();
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();

let dateCreated = `${day}/${month}/${year}`;

export default [
    {
        id: 1,
        nameBranch: 'branch-name-lk',
        link: 'http://box01.demo.pharma.io',
        createDate: dateCreated
    },
    {
        id: 2,
        nameBranch: null,
        link: null,
        createDate: null
    },
    {
        id: 3,
        nameBranch: null,
        link: null,
        createDate: null
    },
    {
        id: 4,
        nameBranch: 'branch-name-lk',
        link: 'http://box04.demo.pharma.io',
        createDate: dateCreated
    },
    {
        id: 5,
        nameBranch: 'branch-name-lk',
        link: 'http://box05.demo.pharma.io',
        createDate: dateCreated
    },
    {
        id: 6,
        nameBranch: 'branch-name-lk',
        link: 'http://box06.demo.pharma.io',
        createDate: dateCreated
    },
    {
        id: 7,
        nameBranch: null,
        link: null,
        createDate: null
    },
    {
        id: 8,
        nameBranch: null,
        link: null,
        createDate: null
    }
];
