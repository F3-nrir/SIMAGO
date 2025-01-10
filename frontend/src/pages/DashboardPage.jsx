import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './records.css'

export const RecordsPage = () => {
    const [recordType, setRecordType] = useState('record-products');
    const [date, setDate] = useState('');
    const [data, setData] = useState([]);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        const fetchDates = async () => {
            const result = await axios.get(`http://localhost:8000/sales/`);
            const uniqueDates = [...new Set(result.data.map(item => item.date))];
            setDates(uniqueDates);
        }; 

        fetchDates();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`http://localhost:8000/${recordType}/`);
            if (recordType ==='record-products') {
                setData(result.data.filter(item => item.recProduct_date == date));
            }else if (recordType ==='record-areas') {
                setData(result.data.filter(item => item.recArea_date == date));
            }else{
                setData(result.data.filter(item => item.recRegister_date == date));
            }
        };

        if (date) {
            fetchData();
        }
    }, [recordType, date]);

    return (
        <div className="container">
            <br/><br/>
            <select className="select" onChange={e => setRecordType(e.target.value)}>
                <option value="">Seleccione un tipo de Registro</option>
                <option value="record-products">Productos</option>
                <option value="record-areas">Áreas</option>
                <option value="record-registers">Caja</option>
            </select>
            <select className="select" onChange={e => setDate(e.target.value)}>
                <option value="">Seleccione una de las fechas de ventas</option>
                {dates.map((date, index) => (
                    <option key={index} value={date}>{date}</option>
                ))}
            </select>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cantidad</th>
                        <th>Precio Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.product_id || row.area_id || row.register_id}</td>
                            <td>{row.Cant_product || row.cant_area || row.cant_register}</td>
                            <td>{row.productTotal_price || row.areaTotal_price || row.registerTotal_price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
