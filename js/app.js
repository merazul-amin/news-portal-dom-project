//Firsty load data of category 

try {
    fetch(` https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => loadCategory(data))
}
//this catch is for show error in fetching data in ui
catch (error) {
    const errorContainer = document.getElementById('error-container')
    errorContainer.innerHTML = `
    <div class="card mb-3">
    <div class="row g-0">
        <div class="col">
            <div class="card-body">
                <h1 class="card-title">${error}</h1>
            </div>
        </div>
    </div>
</div>
    `
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

    //this catch is for show error in fetching data in ui
    catch (error) {
        const errorContainer = document.getElementById('error-container')
        errorContainer.innerHTML = `
        <div class="card mb-3">
        <div class="row g-0">
            <div class="col">
                <div class="card-body">
                    <h1 class="card-title">${error}</h1>
                </div>
            </div>
        </div>
    </div>
        `
    }

}


const showNews = (news) => {
    // console.log(news)
    //set the number of category news
    const categoriesNewsNumber = document.getElementById('category-items')
    categoriesNewsNumber.innerHTML = `
    <p>${news.data.length} items found for this category.</p>
    `

    //now set total news in ui
    const newsContainer = document.getElementById('news-container')
    newsContainer.innerHTML = ''
    const newsArray = news.data
    // console.log(newsArray)
    newsArray.forEach(oneNews => {
        console.log(oneNews)
        const div = document.createElement('div')
        div.classList.add('card')
        div.classList.add('mb-3')
        div.innerHTML = `  <div class="row g-0">
        <div class="col-md-4">
            <img src="${oneNews.image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${oneNews.title}</h5>
                <p class="card-text">${oneNews.details.length > 200 ? oneNews.details.slice(0, 200) : oneNews.details}...</p>
            </div>

            <div>
            all container

            <div>
            author container
            </div>
        <div>
        views Container
        </div>
        <div>
        show details button container
        </div>
            </div>
          
        </div>
    </div > `

        newsContainer.appendChild(div)
    });


}

loadNewsData(08)

