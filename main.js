let profileData = [];

const ImgUrls = [
    'bones.jpeg',
    'lebron.jpeg',
    'dreamybull.jpg',
    'patrick.png',
    'sigma.jpeg',
    'patrica.webp',
    'jeff.jpeg',
    'quandaledingle.webp',
    'jonesy.jpeg',
    'haircut.jpeg',
    'fortnite.jpeg',
    'syrianguy.webp',
    'bugslife.jpeg',
    'dabby.jpeg'
];

const mainElement = document.querySelector('main');

async function fetchProfileData(){
    try{
        const response = await fetch('MOCK_DATA.json');
        const data = await response.json();
        return data;
    } catch (error){
        console.error('error fetching:', error);
        return [];
    }
}

async function CreateContainers(){
    profileData = await fetchProfileData();
    if (profileData.length === 0){
        console.log('No profile data available');
        return
    }

    CreatePosts();
}

function CreatePosts(){
    for (let i = 0; i < 10; i++) {
        let profile = profileData[i];
        const likesCount = Math.floor(Math.random() * 1500) + 1;
        const randomIndex = Math.floor(Math.random() * ImgUrls.length);
        const randomImageUrl = ImgUrls[randomIndex];
    
        const contentSection = document.createElement('section');
        contentSection.classList.add('content');
        mainElement.appendChild(contentSection);
    
        const article = document.createElement('article');
        article.classList.add('content-post');
    
        const elementsData = [
            { tag: 'div', classList: ['content__profile'], children: [
                { tag: 'img', classList: ['profile--js'], src: profile['profile--js'], alt: '' },
                { tag: 'h1', classList: ['username--js'], textContent: profile['usename--js'] }
            ]},
            { tag: 'div', classList: ['image__content'], children: [
                { tag: 'img', classList: ['random--img--js'], src: 'img/' + randomImageUrl, alt: '' }
            ]},
            { tag: 'h1', classList: ['username--js'], textContent: profile['usename--js'] },
            { tag: 'h2', classList: ['likes'], textContent: likesCount + ' likes' },
            { tag: 'p', classList: ['date'], textContent: profile['date'] }
        ];
    
        elementsData.forEach(data => {
            const element = document.createElement(data.tag);
            element.classList.add(...data.classList);
            if (data.textContent) element.textContent = data.textContent;
            if (data.src) element.src = data.src;
            if (data.alt) element.alt = data.alt;
            if (data.children) {
                data.children.forEach(childData => {
                    const child = document.createElement(childData.tag);
                    child.classList.add(...childData.classList);
                    if (childData.textContent) child.textContent = childData.textContent;
                    if (childData.src) child.src = childData.src;
                    if (childData.alt) child.alt = childData.alt;
                    element.appendChild(child);
                });
            }
            article.appendChild(element);
        });
    
        contentSection.appendChild(article);
    
        if (i == 9) {
            observer.observe(article);
        }
    }
    
        }
    


function handleIntersection(entries){
    if(entries[0].isIntersecting){
        CreatePosts();
    }
}
let observer = new IntersectionObserver(handleIntersection);


CreateContainers();