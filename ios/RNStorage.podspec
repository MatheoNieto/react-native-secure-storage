Pod::Spec.new do |s|
  s.name         = "react-native-native-storage"
  s.version      = "1.0.0"
  s.summary      = "Native storage module for React Native"
  s.source_files = "ios/**/*.{h,m,swift}"
  s.requires_arc = true
  s.dependency "React-Core"
end