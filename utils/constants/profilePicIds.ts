export const profileToId: { [key: string]: string } = {
  avatar_1: 'cljhcnkv10axy0bpjpknoib7m',
  avatar_2: 'cljhcnkwx0arl0bo3uubcf2i4',
  avatar_3: 'cljhcnkvm0arh0bo3nuenuck9',
  avatar_4: 'cljhcnkx80arp0bo3k6fjjqdo',
  avatar_5: 'cljhcnkwc0ayc0bpj3tmna44k',
  avatar_6: 'cljhcnkz30as50bo3oztx4axi',
  avatar_7: 'cljhcnkxt0arw0bo3qdbsi4tr',
  avatar_8: 'cljhcnkvb0ay70bpjzvzz7598',
  avatar_9: 'cljhcnkv90ay40bpjs36dlosm',
  avatar_10: 'cljhcnkxb0ars0bo3th7pnsqv',
  avatar_11: 'cljhcnkya0as10bo3pk93v64q',
  avatar_12: 'cljhcnkv10axw0bpj42mx7e4y',
}

export const getRandomPhotoId = () => {
  const avatars = Object.keys(profileToId)

  const randomPhotoIdx = Math.floor(Math.random() * avatars.length)
  const randomPhotoName = avatars[randomPhotoIdx]
  const randomPhotoId = profileToId[randomPhotoName]
  return randomPhotoId
}
