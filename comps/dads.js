
          <Typography
          variant="h4"
          noWrap
          sx={{
            display: { xs: "flex", sm: "flex", md: "flex", lg: "flex" },
          }}
        >
          <Link
            href="/dashboard"
            style={{
              color: "#E8E8E8",
              textDecoration: "none",
              fontWeight: 700,
              letterSpacing: ".1rem",
              margin: "15px",
            }}
          >
            Peak
          </Link>
        </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="white"
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            <Link
              href="/dashboard"
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
              }}
            >
              DASHBOARD
            </Link>


            <Link
              href="/workouts/myWorkouts"
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
              }}
            >
              MY WORKOUTS
            </Link>

            <Link
              href="/groups"
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
              }}
            >
              MY GROUPS
            </Link>
            <Link
              href="/calorie-tracker"
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
              }}
            >
              CALORIE TRACKER
            </Link>
            <Link
              href="/achievements"
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
              }}
            >
              ACHIEVEMENTS
            </Link>

            <MenuItem onClick={handleProfile}>Profile</MenuItem>

        <MenuItem onClick={handleClose}>Settings</MenuItem>
            
            <MenuItem onClick={signout}>Logout</MenuItem>




           
          </Menu>
        </Box>
        <Typography
        variant="h4"
        noWrap
        sx={{
          display: { xs: "flex", sm: "flex", md: "flex", lg: "flex" },
        }}
      >
        <Link
          href="/dashboard"
          style={{
            color: "#E8E8E8",
            textDecoration: "none",
            fontWeight: 700,
            letterSpacing: ".1rem",
            margin: "15px",
          }}
        >
          Peak
        </Link>
      </Typography>


        <Box
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          justifyContent="flex-end"
        >
          <Link
              href="/dashboard"
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
              }}
            >
              DASHBOARD
            </Link>
            <Link
              href="/workouts/myWorkouts"
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
              }}
            >
              MY WORKOUTS
            </Link>
            <Link
              href="/groups"
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
              }}
            >
              MY GROUPS
            </Link>
            <Link
              href="/calorie-tracker"
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
              }}
            >
              CALORIE TRACKER
            </Link>
            <Link
              href="/achievements"
              style={{
                margin: "20px",
                color: "#E8E8E8",
                textDecoration: "none",
              }}
            >
              ACHIEVEMENTS
            </Link>
          </Box>
          <Box
            justifyContent="flex-end"
            sx={{ display: { xs: "flex", md: "flex" } }}
          >
            <Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <Avatar src="/pfp.png" />
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Settings</MenuItem>
                        <MenuItem onClick={signout}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            </Box>