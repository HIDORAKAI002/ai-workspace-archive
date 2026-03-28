function parsePackageString (str) {
  if (typeof str !== 'string' || (str.match(/:/g) || []).length > 1) {
    return {
      type: 'unknown'
    }
  } else if (str.includes('@')) {
    return {
      name: str.split('@')[0],
      version: str.split('@')[1],
      type: 'cache'
    }
  } else if (str.startsWith('zip:')) {
    return {
      name: str.substring('zip:'.length),
      type: 'zip'
    }
  } else if (str.endsWith('.zip')) {
    return {
      name: str,
      type: 'zip'
    }
  } else if (str.startsWith('folder:')) {
    return {
      name: str.substring('folder:'.length),
      type: 'folder'
    }
  } else {
    return {
      name: str,
      type: 'folder'
    }
  }
}

module.exports = parsePackageString
