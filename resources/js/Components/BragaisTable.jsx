export default function BragaisTable({ className = '', tableHead = [], tableBody, ...props }) {
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
                {tableBody}
            </tbody>
        </table>
    );
}
