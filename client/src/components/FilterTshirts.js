import React, {Component} from "react"

export default class FilterTshirts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sizes: {
                XS: false,
                S: false,
                M: false,
                L: false,
                XL: false,
                XXL: false
            },
            colors: {
                red: false,
                blue: false,
                green: false,
                indigo: false,
                black: false,
                white: false
            },
            styles: {
                casual: false,
                formal: false,
                sport: false,
                V_neck: false,
                polo: false
            },
            isPanelOpen: false
        }
    }

    togglePanel = () => {
        this.setState(prevState => ({isPanelOpen: !prevState.isPanelOpen}));
    }

    handleCheckboxChange = (type, value) => {
        this.setState(prevState => ({
            ...prevState,
            [type]: {
                ...prevState[type],
                [value]: !prevState[type][value]
            }
        }), () => {
            const filters = {
                size: Object.keys(this.state.sizes).filter(key => this.state.sizes[key]),
                color: Object.keys(this.state.colors).filter(key => this.state.colors[key]),
                style: Object.keys(this.state.styles).filter(key => this.state.styles[key])
            }
            this.props.onFilterChange(filters)
        })
    }


    renderSizeCheckboxes() {
        return (
            <div className="filter-section">
                <br/><br/>
                <h5 className="filter-title"><strong>Size</strong></h5>
                <div className="filter-options">
                    {Object.keys(this.state.sizes).map(size => (
                        <div key={size} className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`size-${size}`}
                                checked={this.state.sizes[size]}
                                onChange={() => this.handleCheckboxChange('sizes', size)}
                            />
                            <label className="form-check-label" htmlFor={`size-${size}`}>{size}</label>
                        </div>
                    ))}
                </div>
            </div>
        )
    }


    renderColorCheckboxes() {
        return (
            <div className="filter-section">
                <h5 className="filter-title"><strong>Color</strong></h5>
                <div className="filter-options">
                    {Object.keys(this.state.colors).map(color => (
                        <div key={color} className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`color-${color}`}
                                checked={this.state.colors[color]}
                                onChange={() => this.handleCheckboxChange('colors', color)}
                            />
                            <label className="form-check-label" htmlFor={`color-${color}`}>{color}</label>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    renderStyleCheckboxes() {
        return (
            <div className="filter-section">
                <h5 className="filter-title"><strong>Styles</strong></h5>
                <div className="filter-options">
                    {Object.keys(this.state.styles).map(style => (
                        <div key={style} className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`style-${style}`}
                                checked={this.state.styles[style]}
                                onChange={() => this.handleCheckboxChange('styles', style)}
                            />
                            <label className="form-check-label" htmlFor={`style-${style}`}>{style}</label>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    render() {
        const {isPanelOpen} = this.state;
        return (
            <>
                <div className={`filter-panel ${isPanelOpen ? "open" : ""}`}>
                    {this.renderSizeCheckboxes()}
                    <br/>
                    {this.renderColorCheckboxes()}
                    <br/>
                    {this.renderStyleCheckboxes()}
                </div>
                <div className="hamburger-container" onClick={this.togglePanel}>
                    <span className="material-symbols-outlined">
                        {isPanelOpen ? 'arrow_back_ios' : 'arrow_forward_ios'}
                    </span>
                </div>
            </>
        );
    }
}
