import { connect } from 'react-redux'
import Import from '../components/Import'

const mapStateToProps = (state) => {
    return {
        cars: state.cars
    }
}

export default connect(mapStateToProps)(Import)