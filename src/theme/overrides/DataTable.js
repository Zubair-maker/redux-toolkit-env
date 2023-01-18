// ----------------------------------------------------------------------

export default function DataTable(theme) {
    return {
        MUIDataTableBodyCell: {
            styleOverrides: {
                root: {
                    textAlign: "center"
                }
            }
        },
        MUIDataTableHeadCell: {
            styleOverrides: {
                root: {
                    textAlign: "center"
                },
                contentWrapper: {
                    justifyContent: "center"
                }
            }
        }

    };
}
