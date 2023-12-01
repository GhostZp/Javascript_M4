'use strict'

const form = document.querySelector('form')

form.addEventListener('submit', async function(evt) {
    evt.preventDefault();

    const input = document.querySelector('input[id=query]').value;

    const div = document.querySelector('#results');
    div.innerHTML = ""

    try {                                               
        const response = await fetch('https://api.tvmaze.com/search/shows?q=$'+input);
        const data = await response.json();          
        console.log(data); 

        for (let show of data) {

            const name = show.show.name;
            const url = show.show.url;
            const image = show.show.image?.medium;
            const summary = show.show.summary;

            let article = document.createElement('article');
            div.appendChild(article);

            let h2 = document.createElement('h2');
            h2.textContent = name;
            article.appendChild(h2);

            let a= document.createElement('a');
            a.href = url;
            a.textContent = url;
            a.target = "_blank";
            article.appendChild(a);

            let img = document.createElement('img');
            img.src = image;
            img.alt = name;
            article.appendChild(img)

            let summ = document.createElement('summ');
            summ.innerHTML = summary;
            article.appendChild(summ);
        }

    } catch (error) {
        console.log(error.message);
    }
});