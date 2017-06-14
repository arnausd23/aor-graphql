import React from 'react';
import {
    translate,
    AutocompleteInput,
    FunctionField,
    BooleanField,
    BooleanInput,
    Datagrid,
    DateField,
    DateInput,
    Edit,
    EditButton,
    Filter,
    List,
    NullableBooleanInput,
    NumberField,
    ReferenceInput,
    ReferenceField,
    ReferenceManyField,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput,
} from 'admin-on-rest';
import Icon from 'material-ui/svg-icons/editor/attach-money';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import NbItemsField from './NbItemsField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import Basket from './Basket';

export const CommandIcon = Icon;

const CommandFilter = props => (
    <Filter {...props}>
        <TextInput label="pos.search" source="q" alwaysOn />
        <ReferenceInput source="customer.id" reference="Customer">
            <AutocompleteInput optionText={choice => `${choice.firstName} ${choice.lastName}`} />
        </ReferenceInput>
        <SelectInput
            source="status" choices={[
                { id: 'delivered', name: 'delivered' },
                { id: 'ordered', name: 'ordered' },
                { id: 'cancelled', name: 'cancelled' },
            ]}
        />
        <DateInput source="date_gte" />
        <DateInput source="date_lte" />
        <TextInput source="total_gte" />
        <NullableBooleanInput source="returned" />
    </Filter>
);

export const CommandList = props => (
    <List {...props} filters={<CommandFilter />} sort={{ field: 'date', order: 'DESC' }} perPage={25}>
        <Datagrid >
            <DateField source="date" showTime />
            <TextField source="reference" />
            <CustomerReferenceField />
            <NbItemsField />
            <NumberField source="total" options={{ style: 'currency', currency: 'USD' }} elStyle={{ fontWeight: 'bold' }} />
            <TextField source="status" />
            <BooleanField source="returned" />
            <EditButton />
        </Datagrid>
    </List>
);

const CommandTitle = translate(({ record, translate }) => console.log({record}) || <span>{translate('resources.Command.name', { smart_count: 1 })} #{record.reference}</span>);

export const CommandEdit = translate(({ translate, ...rest }) => (
    <Edit title={<CommandTitle />} {...rest}>
        <SimpleForm>
            <Basket />
            <DateInput source="date" />
            <ReferenceInput source="customer.id" reference="Customer">
                <AutocompleteInput optionText={choice => `${choice.firstName} ${choice.lastName}`} />
            </ReferenceInput>
            <SelectInput
                source="status"
                choices={[
                    { id: 'delivered', name: 'delivered' },
                    { id: 'ordered', name: 'ordered' },
                    { id: 'cancelled', name: 'cancelled' },
                ]}
            />
            <BooleanInput source="returned" />
            <div style={{ clear: 'both' }} />
        </SimpleForm>
    </Edit>
));
