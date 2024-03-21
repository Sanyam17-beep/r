function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: '2-digit' };
  return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
}

export const columns = [
    {
      id:'id',
      accessorKey: 'id',
      header: 'id',
      size:5
    },
    {
      id:'name',
      accessorKey: 'name',
      header: 'Name',
      size:20
    },
    {
      id:'category',
      accessorKey: 'category',
      header: 'Category',
      size:20,
      filterFn:'contains'
    },
    {
      id:'subcategory',
      accessorKey: 'subcategory',
      header: 'Subcategory',
      size:20,
      filterFn:'contains'
    },
    {
      accessorFn: (row) => formatDate(row.createdAt),
        id: 'createdAt',
        header: 'Created At',
        accessorKey:"createdAt",
        size:20,
        filterVariant:'date-range'
        ,filterFn: 'between',
       
    },
    {
      accessorFn: (originalRow) => new Date(originalRow.updatedAt),
        id: 'updatedAt',
        header: 'Updated At',
        accessorKey:"updatedAt",
        size:20,
        filterVariant: 'date-range',
        Cell: ({ cell }) => cell.getValue().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }),
    },
    {
        id:'price',
        accessorKey: 'price',
        header: 'Price',
        size:5,
        filterFn: 'between',
    },
    {
      id:'sale_price',
      accessorKey: 'sale_price',
      header: 'Sales Price',
      filterFn: 'between',
      filterFn : (value) => value !== null,
      size:5
    },
  ];




