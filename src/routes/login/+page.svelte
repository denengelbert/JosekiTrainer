<div class="card p-4">

    <form method='POST' action="?/login">
        <label class="label">
            <span>Username: </span>
            <input class="input" type="text" name="uname" placeholder="Username"/>
        </label>
        <label class="label">
            <span>Password:</span>
            <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                <input class="input" type="password" name="pw" placeholder="Password"/>
                <button class="btn variant-filled-primary" name="login" value="login">Login</button>
            </div>
        </label> 
    </form>
    
</div>

