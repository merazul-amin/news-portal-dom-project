//Firsty load data of category 

try {
    fetch(` https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => loadCategory(data))
}
catch (error) {
    // console.log(error)
}


//Now set a function for set catagories name in ui


const loadCategory = (categorys) => {
    // console.log(categorys.data)
    const categoriesArray = categorys.data.news_category
    // console.log(categoriesArray)

    categoriesArray.forEach(category => {
        // console.log(category)
        const categorisContainer = document.getElementById('categories-container')
        const h5 = document.createElement('h5')

        h5.innerHTML = `
        <h5 onclick="loadNewsData(${category.category_id})"  style="cursor: pointer;">${category.category_name}</h5>
        `
        categorisContainer.appendChild(h5)
    });

}

//Now a function for load and show news by category clicking
const loadNewsData = (id) => {
    // console.log(typeof id)
    // console.log(id)
    try {
        fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
            .then(res => res.json())
            .then(data => showNews(data))
    }
    catch {

    }

}


const showNews = (news) => {
    console.log(news)
    //set the number of category news
    const categoriesNewsNumber = document.getElementById('category-items')
    categoriesNewsNumber.innerHTML = `
    <p></p>
    `
}



