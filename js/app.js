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
        console.log(category)
        const categorisContainer = document.getElementById('categories-container')
        const h5 = document.createElement('h5')

        h5.innerHTML = `
        <h5 onclick="showNewsOfThisCatagory(${parseInt(category.category_id)})"><a class="text-decoration-none" href="">${category.category_name}</a></h5>
        `
        categorisContainer.appendChild(h5)
    });

}

//Now a function for show news by category clicking

