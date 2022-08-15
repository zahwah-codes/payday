import React, {useState, useRef} from 'react'
import { useRouter } from 'next/router'
import {toast } from 'react-toastify';

const AddNew = () => {

    const router = useRouter()
    const [items, setItems] = useState([])

    const senderStreet = useRef('')
    const senderCity = useRef('')
    const senderPostalCode = useRef('')
    const senderCountry = useRef('')
    const clientName = useRef('')
    const clientEmail = useRef('')
    const clientStreet = useRef('')
    const clientCity = useRef('')
    const clientPostalCode = useRef('')
    const clientCountry = useRef('')
    const description= useRef('')
    const createdAt = useRef('')
    const paymentTerms = useRef('')



    // Add Product Item 
    const addItem = () => {
        setItems([ ... items, {name: '', quatity:0, price: 0, total: 0}])
        console.log(items);
    }

    // Handler Change 

    const handlerChange = (event, i) => {
        const {name, value} = event.target
        const list =[ ... items]
        list[i][name] = value
        list[i]['total'] = list[i]['quantity'] * list[i]['price']
        setItems(list)
    }

    // Delete Product Items 

    const deleteItem = (i) => {
        const inputData = [... items ]
        inputData.splice(i,1)
        setItems(inputData)
    }

    // Total Amount of All Product Items 

    const totalAmount = items.reduce((acc, curr) => (acc + curr.total), 0)

    // Submit data to the database 
    const createInvoice = async (status) => {
        try {
          if (
            senderStreet.current.value === "" ||
            senderCity.current.value === "" ||
            senderPostalCode.current.value === "" ||
            senderCountry.current.value === "" ||
            clientName.current.value === "" ||
            clientEmail.current.value === "" ||
            clientStreet.current.value === "" ||
            clientCity.current.value === "" ||
            clientPostalCode.current.value === "" ||
            clientCountry.current.value === "" ||
            description.current.value === "" ||
            createdAt.current.value === "" ||
            items.length === 0
          ) {
            toast.warning("All fields are required. Must provide valid data");
          } else {
            const res = await fetch("/api/add-new", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                senderStreet: senderStreet.current.value,
                senderCity: senderCity.current.value,
                senderPostalCode: senderPostalCode.current.value,
                senderCountry: senderCountry.current.value,
                clientName: clientName.current.value,
                clientEmail: clientEmail.current.value,
                clientStreet: clientStreet.current.value,
                clientCity: clientCity.current.value,
                clientPostalCode: clientPostalCode.current.value,
                clientCountry: clientCountry.current.value,
                description: description.current.value,
                createdAt: createdAt.current.value,
                paymentDue: createdAt.current.value,
                paymentTerms: paymentTerms.current.value,
                status: status,
                items: items,
                total: totalAmount,
              }),
            });
            const data = await res.json();
    
            toast.success(data.message);
            router.push("/");
          }
        } catch (error) {
          toast.error("Something went wrong!");
        }
      };

  return (
    <div className="main__container">
        <div className="new__invoice">
            <div className="new__invoice-header">
                <h3> New Invoice</h3>
            </div>

            { /* New Invoice Body */}
            <div className="new__invoice-body">

                {/* Bill From */}
                <div className="bill__form">
                    <p className="bill__title">Bill from </p>

                    <div className="form__group">
                        <p> Street Address</p>
                        <input type="text" name="" id="" ref={senderStreet}/>
                    </div>

                    <div className="form__group inline__form-group">
                        <div>
                            <p> City</p>
                            <input type="text" name="" id="" ref={senderCity}/>
                        </div>

                        <div>
                            <p> Postal Code </p>
                            <input type="text" name="" id=""ref={senderPostalCode} />
                        </div>

                        <div>
                            <p> Country </p>
                            <input type="text" name="" id="" ref={senderCountry}/>
                        </div>
                    </div>
                </div>

                {/* Bill To */}

                <div className="bill__form">
                    <p className="bill__title">Bill to </p>

                    <div className="form__group">
                        <p> Client Name </p>
                        <input type="text" name="" id=""ref={clientName}/>
                    </div>

                    <div className="form__group">
                        <p> Client Email </p>
                        <input type="text" name="" id="" ref={clientEmail}/>
                    </div>
                    
                    <div className="form__group">
                        <p> Street Address </p>
                        <input type="text" name="" id="" ref={clientStreet} />
                    </div>

                    <div className="form__group inline__form-group">
                        <div>
                            <p> City</p>
                            <input type="text" name="" id="" ref={clientCity} />
                        </div>

                        <div>
                            <p> Postal Code </p>
                            <input type="text" name="" id="" ref={clientPostalCode}/>
                        </div>

                        <div>
                            <p> Country </p>
                            <input type="text" name="" id="" ref={clientCountry} />
                        </div>
                    </div>

                    <div className="form__group inline__form-group">
                        <div className="inline__group">
                            <p> Invoice Date </p>
                            <input type="date" name="" id="" ref={createdAt}/>
                        </div>

                        <div className="inline__group">
                            <p> Payment Terms </p>
                            <input type="text" name="" id="" ref={paymentTerms}/>
                        </div>
                    </div>

                    <div className="form__group">
                        <p> Project Description </p>
                        <input type="text" name="" id="" ref={description}/>
                    </div>

                </div>

                {/* Invoice Product Items */}

                <div className="invoice__items">
                    <h3> Item List </h3>
                    {items?.map((item, i) => (
                    <div className="item" key={i}>
                        <div className="form__group inline__form-group">
                            <div>
                                <p> Item Name </p>
                                <input type="text" name="name" id="" onChange={e=> handlerChange(e,i)} />
                            </div>

                            <div>
                                <p> Qty</p>
                                <input type="number" name="quantity" id="" onChange={e=> handlerChange(e,i)} />
                            </div>

                            <div>
                                <p> Price </p>
                                <input type="number" name="price" id="" onChange={e=> handlerChange(e,i)} />
                            </div>

                            <div>
                                <p> Total </p>
                                <h4> {item.total} </h4>
                            </div>

                            <button className="edit__btn edit__itemlist-btn" onClick={()=> deleteItem(i)}>Delete</button>
                        </div>
                    </div>
                    ))}
                </div>

                <button className="add__item-btn" onClick={addItem}> Add New Item </button>

                <div className="new__invoice__btns">
                    <button className="edit__btn" onClick={()=> router.push('/')}> Discard </button>
                    <div>
                        <button className="draft__btn" onClick={() => createInvoice('draft')}> Save as Draft </button>
                        <button className="mark__as-btn" onClick={() => createInvoice('pending')}> Send & Save </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddNew