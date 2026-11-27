$downloads = @(
    @("frontend/public/assets/screens/product_details.png", "https://www.figma.com/api/mcp/asset/29425a94-f3a4-4bba-ad8c-1a427c58c000.png"),
    @("frontend/public/assets/screens/shopping_cart.png", "https://www.figma.com/api/mcp/asset/f829566b-fb64-4f33-8dc6-5a385d2b1652.png"),
    @("frontend/public/assets/screens/checkout_payment.png", "https://www.figma.com/api/mcp/asset/36812391-f13f-483b-9b96-fb87f381880b.png"),
    @("frontend/public/assets/screens/confirm_wallet.png", "https://www.figma.com/api/mcp/asset/49f19c97-a451-4a6f-bd42-34a306ccac44.png"),
    @("frontend/public/assets/screens/insufficient_balance.png", "https://www.figma.com/api/mcp/asset/96db77fe-4955-4141-9934-0d2974165ada.png"),
    @("frontend/public/assets/screens/payment_success.png", "https://www.figma.com/api/mcp/asset/310dbf75-d4f6-4a14-9385-ff8396480220.png"),
    @("frontend/public/assets/screens/order_successful.png", "https://www.figma.com/api/mcp/asset/8f3dafbe-f816-4be2-b457-bc123cfe581e.png"),
    @("frontend/public/assets/screens/order_history.png", "https://www.figma.com/api/mcp/asset/6b8e29b1-9a84-4ee6-a0ea-dd1c2f62668f.png"),
    @("frontend/public/assets/screens/order_details.png", "https://www.figma.com/api/mcp/asset/6fd43937-1b52-4d3d-ae0d-f4fb65f6d0e9.png"),
    @("frontend/public/assets/screens/balance_rewards.png", "https://www.figma.com/api/mcp/asset/b721fb74-5a2b-49a1-8db3-966bc32a3226.png"),
    @("frontend/public/assets/screens/rewards_redemption.png", "https://www.figma.com/api/mcp/asset/b318fa94-ca8e-4dd9-be8a-8c3da95d52e7.png"),
    @("frontend/public/assets/screens/login.png", "https://www.figma.com/api/mcp/asset/16e3e213-2fc4-4124-9cd7-4b42e511d9f9.png"),
    @("frontend/public/assets/screens/create_account.png", "https://www.figma.com/api/mcp/asset/1917065e-10f3-4acf-9e3c-0ecfe82b256f.png"),
    @("frontend/public/assets/products/detail_main.png", "https://www.figma.com/api/mcp/asset/b02f49f3-1ea0-4a0f-b7e3-584c7840a0e6"),
    @("frontend/public/assets/products/detail_thumb1.png", "https://www.figma.com/api/mcp/asset/207c25c0-ce8b-4140-96cd-a1b0aa530588"),
    @("frontend/public/assets/products/detail_thumb2.jpg", "https://www.figma.com/api/mcp/asset/985541fa-8aaa-4f26-ad5b-ed48d8770ea4"),
    @("frontend/public/assets/screens/auth_illustration.png", "https://www.figma.com/api/mcp/asset/b4560c24-c5b9-4a5d-a100-8a6e4406c9c4"),
    @("frontend/public/assets/screens/auth_bg.jpg", "https://www.figma.com/api/mcp/asset/38f3b80a-f320-417e-9269-1a0ed42da522")
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
