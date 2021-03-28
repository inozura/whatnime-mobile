import React, { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

interface typeProps {
  children: ReactNode,
  color: string,
  radius: number,
  padding: number
}

const Card = ({children, style}: any) => {
  return (
    <View style={[styles.cardContainer, style]}>
      {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20,
    flex: 1,
    backgroundColor: "#252836",
    borderRadius: 10,
    shadowColor: "#b1b1b1",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 4,
  }
})
