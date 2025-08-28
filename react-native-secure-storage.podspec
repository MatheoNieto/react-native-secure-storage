require 'json'
package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = package['name']
  s.version      = package['version']
  s.summary      = package['description']
  s.homepage     = "https://github.com/MatheoNieto/react-native-secure-storage"
  s.license      = package['license']
  s.author       = { "Mateo" => "matheo.developer@gmail.com" }
  s.platform     = :ios, "11.0"
  s.source       = { :git => "https://github.com/MatheoNieto/react-native-secure-storage.git", :tag => "#{s.version}" }
  s.source_files = "ios/**/*.{h,m,swift}"
  s.requires_arc = true

  s.dependency "React-Core"
  
  # For RN 0.68+
  if respond_to?(:install_modules_dependencies, true)
    install_modules_dependencies(s)
  end
end