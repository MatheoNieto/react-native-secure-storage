require 'json'
package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name = package['name']
  s.version = package['version']
  s.summary = 'Native storage module for React Native'
  s.description = 'A simple native module for secure storage in React Native'
  s.homepage = 'https://github.com/MatheoNieto/react-native-secure-storage.git'
  s.license = package['license']
  s.author = { 'Mateo' => 'matheo.developer@gmail.com' }
  
  s.platform = :ios, '11.0'
  s.source = { :git => 'https://github.com/MatheoNieto/react-native-secure-storage.git', :tag => s.version }
  
  s.source_files = 'ios/**/*.{h,m,swift}'
  s.public_header_files = 'ios/**/*.h'
  
  s.requires_arc = true
  
  s.dependency 'React-Core'
  s.dependency 'React-RCTBridge'
  
  install_modules_dependencies(s)
end