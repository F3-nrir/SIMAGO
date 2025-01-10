import './GraphicsPage.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row, Col, Select } from 'antd';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const { Option } = Select;

function generateChartData(data) {
    const salesPerDay = data.map(item => ({
        name: `Día ${new Date(item.recProduct_date).getDate()}`,
        value: item.Cant_product,
    }));

    const totalSalesPrice = data.map(item => ({
        name: `Día ${new Date(item.recProduct_date).getDate()}`,
        value: item.productTotal_price,
    }));

    const salesPerRegister = {};
    data.forEach(item => {
        if (salesPerRegister[item.register]) {
            salesPerRegister[item.register] += item.Cant_product;
        } else {
            salesPerRegister[item.register] = item.Cant_product;
        }
    });
    const salesPerRegisterArray = Object.entries(salesPerRegister).map(([register, quantity]) => ({
        name: `Caja ${register}`,
        value: quantity,
    }));

    return { salesPerDay, totalSalesPrice, salesPerRegisterArray };
}

export function GraphicsPage() {
    const [data, setData] = useState([]);
    const [totalSalesPriceData, setTotalSalesPriceData] = useState([]);
    const [salesPerRegisterData, setSalesPerRegisterData] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/products/')
            .then(response => {
                console.log(response.data)
                setProducts(response.data);
                setSelectedProduct(response.data[0].product_id);
            });
    }, []);

    useEffect(() => {
        if (selectedProduct) {
            axios.get(`http://localhost:8000/record-products/?product_id=${selectedProduct}`)
                .then(response => {
                    // Filtramos los datos por el product_id seleccionado
                    const filteredData = response.data.filter(item => item.product_id === selectedProduct);
                    const chartData = generateChartData(filteredData);
                    setData(chartData.salesPerDay);
                    setTotalSalesPriceData(chartData.totalSalesPrice);
                    setSalesPerRegisterData(chartData.salesPerRegisterArray);
                });
        }
    }, [selectedProduct]);

    return (
        <div className="container">
            <Select className="select-product" value={selectedProduct} onChange={value => setSelectedProduct(value)}>
                {products.map(product => (
                    <Option key={product.product_id} value={product.product_id}>
                        {product.product_name}
                    </Option>
                ))}
            </Select>
            <div className="chart-container">
                <div className="chart-box">
                    <h2>Ventas por día</h2>
                    <BarChart width={500} height={300} data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </div>
                <div className="chart-box">
                    <h2>Precio total de las ventas</h2>
                    <LineChart width={500} height={300} data={totalSalesPriceData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                </div>
                <div className="chart-box">
                    <h2>Distribución de las ventas</h2>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={salesPerRegisterData}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {
                                salesPerRegisterData.map((entry, index) => <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />)
                            }
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>
        </div>
    );
}
