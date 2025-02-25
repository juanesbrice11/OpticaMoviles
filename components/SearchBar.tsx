import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

interface SearchBarComponentProps {

}

const SearchBarComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleQuery = (query: string) => {
        setSearchQuery(query)
    }

    return (
        <View>
            <Text>SearchBarComponent</Text>
            <TextInput
                placeholder='Buscar...'
                className='py-2 px-5 border border-black bg-white rounded-md'
                value={searchQuery}
                onChangeText={(query) => handleQuery(query)}
            />
        </View>
    )
}

export default SearchBarComponent