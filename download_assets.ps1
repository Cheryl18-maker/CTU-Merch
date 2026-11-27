$downloads = @(
    @("frontend/public/assets/screens/welcome.png", "https://www.figma.com/api/mcp/asset/192db161-ccf1-4093-881e-07ffc555fc61.png"),
    @("frontend/public/assets/screens/catalog.png", "https://www.figma.com/api/mcp/asset/4f938e15-25b3-4a23-953a-e3e9fa12971a.png"),
    @("frontend/public/assets/products/prod_1.png", "https://www.figma.com/api/mcp/asset/f17906cb-af47-487a-b1f0-974c4f09d251"),
    @("frontend/public/assets/products/prod_2.jpg", "https://www.figma.com/api/mcp/asset/99334e3c-75b9-40cd-bb92-b43b292fe5b7"),
    @("frontend/public/assets/products/prod_3.jpg", "https://www.figma.com/api/mcp/asset/439f0418-f063-4521-82cb-860c57fbb30e"),
    @("frontend/public/assets/products/prod_4.jpg", "https://www.figma.com/api/mcp/asset/8d4730bd-c681-4eef-bb9f-025081f80260"),
    @("frontend/public/assets/products/prod_5.jpg", "https://www.figma.com/api/mcp/asset/7377e97a-2d69-4cfd-86d5-fd04c32abac3"),
    @("frontend/public/assets/products/prod_6.png", "https://www.figma.com/api/mcp/asset/4eea7d54-035a-4fac-9a02-e9e30b7a5f45"),
    @("frontend/public/assets/products/prod_7.png", "https://www.figma.com/api/mcp/asset/fbdb55a7-38f4-4c84-bcac-47efa10776ad"),
    @("frontend/public/assets/products/prod_8.png", "https://www.figma.com/api/mcp/asset/42ae9f8f-32e8-4774-924d-fcb71820f634"),
    @("frontend/public/assets/products/prod_9.jpg", "https://www.figma.com/api/mcp/asset/954c172f-ca28-4fef-910a-685e6602c9c8"),
    @("frontend/public/assets/products/prod_10.jpg", "https://www.figma.com/api/mcp/asset/c4038b58-3207-49a4-857b-09aa6f8842c6"),
    @("frontend/public/assets/products/prod_11.png", "https://www.figma.com/api/mcp/asset/2f1fedda-440c-4069-b2d1-7282ac1e6d56"),
    @("frontend/public/assets/products/prod_12.jpg", "https://www.figma.com/api/mcp/asset/1fba61c4-481c-4054-8252-6297fc8a178e"),
    @("frontend/public/assets/products/prod_13.png", "https://www.figma.com/api/mcp/asset/89f17aa3-300c-4c1a-8424-1ce990a02b99"),
    @("frontend/public/assets/products/prod_14.jpg", "https://www.figma.com/api/mcp/asset/57263114-7933-4d3a-b21c-6181d353decd"),
    @("frontend/public/assets/products/prod_15.jpg", "https://www.figma.com/api/mcp/asset/4dc72e96-223b-4fcd-ae1c-1c7b334478e5"),
    @("frontend/public/assets/products/prod_16.png", "https://www.figma.com/api/mcp/asset/2f7cd005-d944-4fc5-ba13-daf273409147"),
    @("frontend/public/assets/products/prod_17.png", "https://www.figma.com/api/mcp/asset/612ed5a8-2678-47b3-8e0b-5219f1bcc1ad"),
    @("frontend/public/assets/products/prod_18.png", "https://www.figma.com/api/mcp/asset/5379f922-09d2-4bc7-ad91-e64b00422cdc"),
    @("frontend/public/assets/products/prod_19.png", "https://www.figma.com/api/mcp/asset/e4361885-0ecd-4fa6-95dc-d16db71c9413"),
    @("frontend/public/assets/products/prod_20.png", "https://www.figma.com/api/mcp/asset/6dfb0614-b591-4499-9bc8-fa51efcf1bdd"),
    @("frontend/public/assets/screens/hero_campus.jpg", "https://www.figma.com/api/mcp/asset/dcc5d04a-5f1f-4e53-8cd7-f7959e697a74"),
    @("frontend/public/assets/screens/ctu_logo.png", "https://www.figma.com/api/mcp/asset/6a5d8edb-ea4a-4301-b45e-6ef7411fc8dc")
)

foreach ($item in $downloads) {
    $dest = $item[0]
    $url = $item[1]
    Write-Host "Downloading $dest..."
    & curl.exe -s -f -L -o $dest $url
    if (Test-Path $dest) {
        $size = (Get-Item $dest).Length
        Write-Host "Saved $dest ($size bytes)"
    } else {
        Write-Host "Failed to save $dest"
    }
}
