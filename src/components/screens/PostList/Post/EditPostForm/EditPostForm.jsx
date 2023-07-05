import styles from './EditPostForm.module.css'
import { useState } from 'react'
const EditPostForm = (prop) => {
    const [title, setTitle] = useState(prop.prop.title)
    const [description, setDescription] = useState(prop.prop.description)
    const [category, setCategory] = useState(prop.prop.category)
    const [price, setPrice] = useState(prop.prop.price)
    const [url, setUrl] = useState(prop.prop.url)
    const titleChange = (e) => {
        e.preventDefault()
        setTitle(e.target.value)
    }

    const descriptionChange = (e) => {
        e.preventDefault()
        setDescription(e.target.value)
    }

    const categoryChange = (e) => {
        e.preventDefault()
        setCategory(e.target.value)
    }

    const priceChange = (e) => {
        e.preventDefault()
        setPrice(e.target.value)
    }

    const urlChange = (e) => {
        e.preventDefault()
        setUrl(e.target.value)
    }

    const saveForm = (e) => {
        e.preventDefault()
        const formData = {
            id: prop.prop.id,
            title: title,
            description: description,
            category: category,
            price: price,
            url: url
          }
        prop.saveForm(formData)
    }

    const closeForm = () => {
        prop.closeForm()
    }

    return (
        <form className={styles.form} onSubmit={saveForm}>
            <h2 className={styles.header}>Fill in all the fields</h2>
            <div className={styles.group}>
                <label htmlFor="id">ID:</label>
                <input type="text" id="id" name={prop.prop.id} placeholder={prop.prop.id} readOnly/>
            </div>
            <div className={styles.group}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" minLength={3} maxLength={20} value={title} onChange={titleChange} required/>
            </div>
            <div className={styles.group}>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" minLength={3} maxLength={20} value={description} onChange={descriptionChange} required/>
            </div>
            <div className={styles.group}>
                <label htmlFor="category">Category:</label>
                <input type="text" id="category" name="category" minLength={3} maxLength={10} value={category} onChange={categoryChange} required/>
            </div>
            <div className={styles.group}>
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" min={0} step={.01} value={price} onChange={priceChange} required/>
            </div>
            <div className={styles.group}>
                <label htmlFor="url">Image URL:</label>
                <input type="text" id="url" name="url" value={url} pattern='(.*png$)|(.*jpg$)|(.*jpeg$)' onChange={urlChange} required/>
            </div>
            <div>
                <button type="submit">Save</button>
                <button type="button" onClick={closeForm}>Close</button>
            </div>
        </form>
    )
}

export {EditPostForm}