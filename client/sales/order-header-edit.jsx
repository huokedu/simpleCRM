import React from 'react';
import Autosuggest from 'react-autosuggest';
import AsyncSelectInput from '../controls/asyncSelectInput.jsx';



const OrderHeaderEdit = React.createClass({
    propTypes: {
        order: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object.isRequired,
        isValid: React.PropTypes.bool,
        customerOptions: React.PropTypes.array.isRequired
    },

    mixins: [ ReactMeteorData ],

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {
        //console.log("OrderEditForm.getMeteorData");

        // for the companies list on the Order Header
        var customerHandle = Meteor.subscribe('CustomerCompanies.public');
        var customers = CustomerCompanies.find().fetch();

        return {
            customersLoading: customerHandle ? !customerHandle.ready() : {},
            customers
        };
    },

    getOptions(input, callback) {
        setTimeout(function () {
            callback(null, {
                options: [
                    { value: 'one', label: 'One' },
                    { value: 'two', label: 'Two' }
                ],
                // CAREFUL! Only set this to true when there are no more options,
                // or more specific queries will not be sent to the server.
                complete: true
            });
        }, 500);
    },

    render() {
        console.log("OrderHeaderEdit props: ", this.props);

        if (this.data.customersLoading) {
            console.log("loading");
            return ( <h3>Loading Order</h3> );
        }

        return (


            <div>


                <SelectInput
                    name="customerId"
                    label="Customer"
                    value={this.props.order.customerId ? this.props.order.customerId : ''}
                    onChange={this.props.onChange}
                    //placeholder="Next contact date"
                    error={this.props.errors.customerId}
                    options={this.data.customers}
                    valueKey="_id"
                    labelKey="name"

                />

                <TextInput
                    name="deliveryAddress1"
                    label="Delivery Address 1"
                    onChange={this.props.onChange}
                    placeholder="Delivery Address 1"
                    value={this.props.order.deliveryAddress1}
                    error={this.props.errors.deliveryAddress1}
                />


                <TextInput
                    name="notes"
                    label="Notes"
                    onChange={this.props.onChange}
                    placeholder="Notes"
                    value={this.props.order.notes}
                    error={this.props.errors.notes}
                />

                <div className="form-group">
                <label>Total Value: </label>
                <label name="orderTotal">{this.props.order.totalValue}</label>
                </div>

                <div className="form-group">
                <a className="btn btn-warning" id="cancelButton" href="/">Cancel</a>

                <input
                    type="submit"
                    value="Save"
                    className="btn btn-primary"
                    onClick={this.props.onSave}
                    disabled={!this.props.isValid}
                />
                </div>
            </div>
        );
    }
});

export default OrderHeaderEdit;

//<AsyncSelectInput
//    name="customerId"
//    label="Customer"
//    value={this.props.order.customerId ? this.props.order.customerId : ''}
//    onChange={this.props.onChange}
//    //placeholder="Next contact date"
//    error={this.props.errors.customerId}
//    getOptions={this.getOptions}
//    valueKey="_id"
//    labelKey="name"
//
///>