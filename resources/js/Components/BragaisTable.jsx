export default function BragaisTable({ className = '', tableHead = [], tableBody=[], ...props }) {
    return (
        <table
            {...props}
            className={
                'border w-full text-center' +
                className
            }
        > 
            <thead>
                <tr>
                    {tableHead?.map((header, i) => (
                    <th key={i}>
                        {header.name}    
                    </th>
                ))}
                </tr>
                
            </thead>
            <tbody>
                {tableBody?.map((body, i) => (
                    <tr key={i}>
                        {body.items?.map((item, j) => (
                            <td key={i}>
                                {item.name}    
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
