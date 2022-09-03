//Firsty load data of category  and emplemet of try catch for showing error types
fetch(` https://openapi.programming-hero.com/api/news/categories`)
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
    .then((data) => {
        loadCategory(data)
    })
    .catch((error) => {
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
    });


//Loading Spinner function 
const spinner = (isLoading) => {
    const spinnerContainer = document.getElementById('spinner-container')
    if (isLoading) {
        spinnerContainer.classList.remove('d-none')
    } else {
        spinnerContainer.classList.add('d-none')
    }
}


//Now set a function for set catagories name in ui


const loadCategory = (categorys) => {
    const categoriesArray = categorys.data.news_category
    categoriesArray.forEach(category => {
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
    spinner(true)

    fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then((data) => {
            showNews(data)
        })
        .catch((error) => {
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
        });
}


const showNews = (news) => {
    //set the number of category news
    const categoriesNewsNumber = document.getElementById('category-items')
    categoriesNewsNumber.innerHTML = `
    <p class="p-3">${news.data.length ? news.data.length + ' items found for this category.' : 'No data found for this category.'} </p>
    `

    //now set total news in ui
    const newsContainer = document.getElementById('news-container')
    newsContainer.innerHTML = ''
    const newsArray = news.data

    //Now sort the objects by total view
    newsArray.sort((a, b) => {
        return b.total_view - a.total_view;
    });


    newsArray.forEach(oneNews => {
        const div = document.createElement('div')
        div.classList.add('card')
        div.classList.add('mb-3')
        div.innerHTML = `  <div class="row g-0">
        <div class="col-md-4">
            <img src="${oneNews.image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body ">
               <div>
               <h5 class="card-title">${oneNews.title}</h5>
               <p class="card-text">${oneNews.details.length > 200 ? oneNews.details.slice(0, 200) : oneNews.details}...</p>
               </div>
            

            <div class="d-flex flex-column flex-sm-row align-items-center justify-content-around mt-2">

            <div class="d-flex flex-row align-items-center">
            <span><img style="width: 50px; height: 50px; border-radius: 50%;" src="${oneNews.author.img ? oneNews.author.img : 'No photo'}" alt=""></span>
            <span class="ms-2">${oneNews.author.name ? oneNews.author.name : 'No Name'}</span>
            </div>

            <div>
            <span><i class="fa-solid fa-eye"></i><span>
            <span>${oneNews.total_view ? oneNews.total_view : 'No data'}<span>
            </div>
    
            <div>
            <button onclick="loadModalData('${oneNews._id}')" type="button" style="min-width:150px;" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Show More
        </button>
            </div>
    
                </div>
              
            </div>
            </div>
            </div>
            `

        newsContainer.appendChild(div)
    });
    spinner(false)

}

//This function is for load modal data and build with try catch error handling

const loadModalData = (id) => {

    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then((data) => {
            showDetailsOnModal(data.data)
        })
        .catch((error) => {
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
        });
}

const showDetailsOnModal = (data) => {
    data.forEach(obj => {
        const newsModal = document.getElementById('news-details')
        newsModal.innerHTML = `
        <p>
        ${obj.details}
        </p>

        <p>Released date: ${obj.author.published_date ? obj.author.published_date : 'Date unavailable.'}</p>
        <p>Author: ${obj.author.name ? obj.author.name : 'Author Name unavailable.'}</p>
    

        <img src="" alt="">
      
        `

    });

}


//this function is called for load by default data
loadNewsData(08)

