import React, {useState, useEffect, useRef} from 'react'
import { useRouter } from 'next/router'
import { MongoClient, ObjectId } from "mongodb";
import { toast } from "react-toastify";

const EditItem = (props) => {

    const router = useRouter()
    const invoice = props.data

    const [items, setItems] = useState(invoice.items);

    const [senderStreet, setSenderStreet] = useState("");
    const [senderCity, setSenderCity] = useState("");
    const [senderPostalCode, setSenderPostalCode] = useState("");
    const [senderCountry, setSenderCountry] = useState("");
    const [clientName, setClientName] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientStreet, setClientStreet] = useState("");
    const [clientCity, setClientCity] = useState("");
    const [clientPostalCode, setClientPostalCode] = useState("");
    const [clientCountry, setClientCountry] = useState("");
    const [description, setDescription] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [paymentTerms, setPaymentTerms] = useState("");

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
    const totalAmount = items.reduce((acc, curr) => acc + curr.total, 0);

    // Update Invoice In Database
    const updateInvoice = async (invoiceId, status) => {
        try {
        const res = await fetch(`/api/edit/${invoiceId}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            senderStreet: senderStreet,
            senderCity: senderCity,
            senderPostalCode: senderPostalCode,
            senderCountry: senderCountry,
            clientName: clientName,
            clientEmail: clientEmail,
            clientStreet: clientStreet,
            clientCity: clientCity,
            clientPostalCode: clientPostalCode,
            clientCountry: clientCountry,
            description: description,
            createdAt: createdAt,
            paymentDue: createdAt,
            paymentTerms: paymentTerms,
            status: status,
            items: items,
            total: totalAmount,
            }),
        });

        const data = await res.json();

        router.push(`/invoices/${invoiceId}`);
        toast.success(data.message);
        } catch (error) {
        toast.error("Something went wrong!");
        }
    };

      // Set Default Input Data 
    useEffect(() => {
        setSenderCity(invoice.senderAddress.city);
        setSenderStreet(invoice.senderAddress.street);
        setSenderPostalCode(invoice.senderAddress.postalCode);
        setSenderCountry(invoice.senderAddress.country);

        setClientCity(invoice.clientAddress.city);
        setClientStreet(invoice.clientAddress.street);
        setClientPostalCode(invoice.clientAddress.postalCode);
        setClientCountry(invoice.clientAddress.country);

        setClientName(invoice.clientName);
        setClientEmail(invoice.clientEmail);
        setDescription(invoice.description);
        setCreatedAt(invoice.createdAt);
        setPaymentTerms(invoice.paymentTerms);
    }, [invoice]);


  return (
    <div className="main__container">
        <div className="new__invoice">
            <div className="new__invoice-header">
                <h3>Edit #{invoice.id.substr(0, 6).toUpperCase()}</h3>
            </div>

            { /* New Invoice Body */}
            <div className="new__invoice-body">

                {/* Bill From */}
                <div className="bill__form">
                    <p className="bill__title">Bill from </p>

                    <div className="form__group">
                        <p> Street Address</p>
                        <input
                            type="text"
                            value={senderStreet}
                            onChange={(e) => setSenderStreet(e.target.value)}
                        />
                    </div>

                    <div className="form__group inline__form-group">
                        <div>
                            <p> City</p>
                            <input
                            type="text"
                            value={senderCity}
                            onChange={(e) => setSenderCity(e.target.value)}
                            />
                        </div>

                        <div>
                            <p> Postal Code </p>
                            <input
                            type="text"
                            value={senderPostalCode}
                            onChange={(e) => setSenderPostalCode(e.target.value)}
                            />
                        </div>

                        <div>
                            <p> Country </p>
                            <input
                            type="text"
                            value={senderCountry}
                            onChange={(e) => setSenderCountry(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Bill To */}

                <div className="bill__form">
                    <p className="bill__title">Bill to </p>

                    <div className="form__group">
                        <p> Client Name </p>
                        <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}/>
                    </div>

                    <div className="form__group">
                        <p> Client Email </p>
                        <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
              />
                    </div>
                    
                    <div className="form__group">
                        <p> Street Address </p>
                        <input
                        type="email"
                        value={clientStreet}
                        onChange={(e) => setClientStreet(e.target.value)}
                        />
                    </div>

                    <div className="form__group inline__form-group">
                        <div>
                            <p> City</p>
                            <input
                            type="text"
                            value={clientCity}
                            onChange={(e) => setClientCity(e.target.value)}
                            />
                        </div>
                        <div>
                            <p>Postal Code</p>
                            <input
                            type="text"
                            value={clientPostalCode}
                            onChange={(e) => setClientPostalCode(e.target.value)}
                        />
                        </div>

                        <div>
                            <p>Country</p>
                            <input
                            type="text"
                            value={clientCountry}
                            onChange={(e) => setClientCountry(e.target.value)}
                            />
                        </div>
                        </div>

                        <div className="form__group inline__form-group">
                        <div className="inline__group">
                            <p>Invoice Date</p>
                            <input
                            type="date"
                            value={createdAt}
                            onChange={(e) => setCreatedAt(e.target.value)}
                            />
                        </div>

                        <div className="inline__group">
                            <p>Payment Terms</p>
                            <input
                            type="text"
                            value={paymentTerms}
                            onChange={(e) => setPaymentTerms(e.target.value)}
                            />
                        </div>
                        </div>

                        <div className="form__group">
                        <p>Project Description</p>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
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
                                <input type="text" name="name" value={item.name} id="" onChange={e=> handlerChange(e,i)} />
                            </div>

                            <div>
                                <p> Qty</p>
                                <input type="number" name="quantity" value={item.quantity} id="" onChange={e=> handlerChange(e,i)} />
                            </div>

                            <div>
                                <p> Price </p>
                                <input type="number" name="price" value={item.price} id="" onChange={e=> handlerChange(e,i)} />
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

                <div className="new__invoice__btns" style={{justifyContent:'end'}}>
                    <div>
                        <button
                            className="draft__btn"
                            onClick={() => router.push(`/invoices/${invoice.id}`)}>
                            Cancel
                        </button>
                        <button
                            className="mark__as-btn"
                            onClick={() => updateInvoice(invoice.id, invoice.status)}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditItem

export async function getStaticPaths() {
    const client = await MongoClient.connect(
         `mongodb+srv://${process.env.USER__NAME}:${process.env.USER__PASSWORD}@cluster0.sugbuip.mongodb.net/${process.env.DATABASE__NAME}?retryWrites=true&w=majority`,
        { useNewUrlParser: true}
        );
      
    const db = client.db();
    const collection = db.collection("allInvoices");
      
    const invoices = await collection.find({}, { _id: 1 }).toArray();
      
    return {
    fallback: "blocking",
        paths: invoices.map((invoice) => ({
            params: {
              invoiceId: invoice._id.toString(),
            },
          })),
        };
    }    

export async function getStaticProps(context) {
    const { invoiceId } = context.params;
  
    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.USER__NAME}:${process.env.USER__PASSWORD}@cluster0.sugbuip.mongodb.net/${process.env.DATABASE__NAME}?retryWrites=true&w=majority`,
        { useNewUrlParser: true}
    );
  
    const db = client.db();
    const collection = db.collection("allInvoices");
    const invoice = await collection.findOne({ _id: ObjectId(invoiceId) });
  
    return {
      props: {
        data: {
          id: invoice._id.toString(),
          senderAddress: invoice.senderAddress,
          clientAddress: invoice.clientAddress,
          clientName: invoice.clientName,
          clientEmail: invoice.clientEmail,
          description: invoice.description,
          createdAt: invoice.createdAt,
          paymentDue: invoice.paymentDue,
          items: invoice.items,
          total: invoice.total,
          status: invoice.status,
          paymentTerms: invoice.paymentTerms,
        },
      },
      revalidate: 1,
    };
  }