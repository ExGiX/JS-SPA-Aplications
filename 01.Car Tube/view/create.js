import { render, html } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { createCar , getCarById} from '../api/data.js';
const main = document.querySelector('main');

const createPageTemplate = (onSubmit) => html`

       <section id="create-listing">
            <div class="container">
                <form @submit=${onSubmit} id="create-form">
                    <h1>Create Car Listing</h1>
                    <p>Please fill in this form to create an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand">

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description">

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year">

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl">

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price">

                    <hr>
                    <input type="submit" class="registerbtn" value="Create Listing">
                </form>
            </div>
        </section>
`





export async function createPageView(ctx) {
    if(sessionStorage.getItem('userToken')) { 
        render(createPageTemplate(onSubmit), main);
        async function onSubmit(e) { 
            e.preventDefault();
            const formData = new FormData(e.target);
            const model = formData.get('model');
            const brand = formData.get('brand');
            const description = formData.get('description');
            const imageUrl = formData.get('imageUrl');
            const year = Number(formData.get('year'));
            const price = Number(formData.get('price'));
            if(description === '' || imageUrl === '' || model === '' || brand === '' || year === '' || price === '') { 
                return alert('All fields are required!');
            }
            if(price < 0 || year < 0) { 
                return alert('Price and year must be a positive numbers!');
            }
            
            await createCar({brand,model,description,year,imageUrl,price});
            ctx.page.redirect(`/cars`);
        }
    }
    
}