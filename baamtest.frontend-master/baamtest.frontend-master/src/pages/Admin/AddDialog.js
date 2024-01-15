import React from "react";
import {
    Dialog, DialogTitle, Button, Grid, FormControl, InputLabel,
    Checkbox, TextField, FormControlLabel, MenuItem, Select
} from "@material-ui/core";
import { Description, PhotoCamera, } from "@material-ui/icons";
import JalaliUtils from "@date-io/jalaali";
import {
    DateTimePicker,
} from "@material-ui/pickers";

const Form = (props) => {
    return (
        <Grid direction="row" container spacing={2} style={{ marginTop: 0 }}>

            {props.form.map((item, idx) => {
                let column = props.columns === 2 ? 6 : 12;

                if (item.type === 'text' || item.type === 'num') {
                    return (
                        <Grid item xs={column}>
                            <TextField
                                onChange={e => {
                                    let event = e.target.value;
                                    if (item.type === 'num') {
                                        event = parseInt(e.target.value)
                                    }
                                    props.handleChange(item.field, event)
                                }}
                                fullWidth
                                type={item.type === 'num' ? "number" : "normal"}
                                value={props.data[item.field]}
                                style={{ marginTop: 0 }}
                                InputProps={{ style: { height: 45 } }}
                                inputProps={{ style: { fontSize: 14 }, className: "danaFaNum" }}
                                InputLabelProps={{ style: { fontSize: 14, top: -2 } }}
                                label={item.name}
                                variant="outlined"
                            />
                        </Grid>
                    )
                }

                if (item.type === 'select') {
                    return (
                        <Grid item xs={column}>
                            <TextField
                                className="admin"
                                select
                                fullWidth
                                value={props.data[item.field]}
                                InputProps={{ style: { height: 45 } }}
                                inputProps={{ style: { fontSize: 19 } }}
                                InputLabelProps={{ style: { fontSize: 14, top: -2 } }}
                                style={{ marginTop: 0 }}
                                label={item.name}
                                onChange={e => props.handleChange(item.field, e.target.value)}
                                variant="outlined"
                            >
                                {item.options.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    )
                }

                if (item.type === 'boolean') {
                    return <Grid item xs={column}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={props.data[item.field]}
                                    onChange={e => props.handleChange(item.field, !props.data[item.field])}
                                    name={item.field}
                                    color="primary"
                                />
                            }
                            label={item.name}
                        />
                    </Grid>
                }

                if (item.type === 'date-time') {
                    return <Grid item xs={column}>
                        <FormControl style={{ marginTop: 0 }} fullWidth variant="outlined">
                            <DateTimePicker
                                okLabel="تأیید"
                                cancelLabel="لغو"
                                InputProps={{
                                    disableUnderline: true,
                                    style: { textAlign: 'center' }
                                }}
                                mode="24h"
                                inputVariant="outlined"
                                label={item.name}
                                InputLabelProps={{ shrink: Boolean(props.data[item.field]), style: { fontSize: 14, top: -2 } }}
                                inputProps={{ style: { fontSize: 14, padding: 14 } }}
                                style={{ height: 45 }}
                                invalidDateMessage=""
                                ampm={false}
                                hideTabs={true}
                                labelFunc={date => (props.data[item.field] ? date.format("HH:mm - jYYYY/jMM/jDD") : null)}
                                value={new Date(props.data[item.field])}
                                onChange={e => props.handleChange(item.field, e._d.toISOString())}
                            />
                        </FormControl>
                    </Grid>
                }

                if (item.type === 'multi-select') {
                    return <Grid item xs={column}>
                        <FormControl style={{ marginTop: 0 }} fullWidth variant="outlined">
                            <InputLabel style={{ fontSize: 14, top: -2 }} htmlFor="outlined-age-native-simple">{item.name}</InputLabel>
                            <Select
                                value={props.data[item.field]}
                                multiple
                                style={{ height: 45 }}
                                className="admin"
                                onChange={e => {
                                    console.error({ e })
                                    props.handleChange(item.field, e.target.value)
                                }}
                                label={item.name}
                                inputProps={{
                                    name: item.field,
                                    id: `outlined-${item.field}-native-simple`,
                                }}
                            >
                                {item.options.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                }

                if (item.type === 'image') {
                    return (<Grid item xs={column}>
                        <div style={{ width: '100%' }}>
                            <input
                                accept="image/*"
                                hidden
                                onChange={e => props.handleChange(item.field, e.target.files[0])}
                                id={`contained-button-${item.field}`}
                                type="file"
                            />
                            <label htmlFor={`contained-button-${item.field}`}>
                                <Button
                                    variant="contained"
                                    startIcon={<PhotoCamera />}
                                    style={{ borderRadius: 5, height: 45, marginTop: 0 }}
                                    color="secondary"
                                    fullWidth
                                    disableElevation
                                    component="span"
                                >
                                    {item.name}
                                </Button>
                            </label>
                        </div></Grid>)
                }

                if (item.type === 'pdf') {
                    return (<Grid item xs={column}><div style={{ width: '100%' }}>
                        <input
                            accept="pdf/*"
                            hidden
                            onChange={e => props.handleChange(item.field, e.target.files[0])}
                            id={`contained-button-${item.field}`}
                            type="file"
                        />
                        <label htmlFor={`contained-button-${item.field}`}>
                            <Button
                                variant="contained"
                                startIcon={<Description />}
                                style={{ borderRadius: 5, height: 45, marginTop: 0 }}
                                color="secondary"
                                fullWidth
                                disableElevation
                                component="span"
                            >
                                {item.name}
                            </Button>
                        </label>
                    </div></Grid>)
                }

            })}
        </Grid>
    )
}

const AddDialog = (props) => {

    return (
        <>
            {props.openDialog && <Dialog maxWidth="lg" onBackdropClick={props.setOpenDialog} onClose={props.setOpenDialog} aria-labelledby="simple-dialog-title" open={props.openDialog}>
                <div style={{ flexDirection: 'column', padding: '10px 30px 30px', width: props.columns === 2 ? 800 : 400, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <DialogTitle id="simple-dialog-title">{props.title}</DialogTitle>
                    <Form {...props} />
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={props.onSubmit}
                        color="primary"
                        disableElevation
                        style={{ borderRadius: 5, height: 45, marginTop: 30 }}
                    >
                        ثبت
                    </Button>
                </div>
            </Dialog>}
        </>
    );
};

export { Form, AddDialog };